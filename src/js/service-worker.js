// Service worker to improve network resilience
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activated");
  return self.clients.claim();
});

// Network-first strategy for API requests
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only handle requests to the backend
  if (
    url.href.includes("klassconnect-backend.onrender.com") ||
    url.pathname.startsWith("/api/")
  ) {
    console.log("Service Worker: Handling request for", url.href);

    // For API requests, try network first, then return a custom offline response
    event.respondWith(
      fetch(event.request).catch((error) => {
        console.log(
          "Service Worker: Fetch failed, returning offline response",
          error
        );
        return new Response(
          JSON.stringify({
            error:
              "You are currently offline. Please check your internet connection.",
          }),
          {
            status: 503,
            headers: { "Content-Type": "application/json" },
          }
        );
      })
    );
  }
});

// Listen for messages from the main thread
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "RETRY_CONNECTION") {
    console.log("Service Worker: Received retry connection request");

    // Notify all clients that we're trying to reconnect
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type: "CONNECTION_RETRY_STARTED",
        });
      });
    });
  }
});
