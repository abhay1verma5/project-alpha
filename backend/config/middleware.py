import logging
import time

logger = logging.getLogger("api.requests")


class RequestLoggingMiddleware:
    """Log all API requests with timing information."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start = time.time()
        response = self.get_response(request)
        duration = time.time() - start

        if request.path.startswith("/api/"):
            logger.info(
                "%s %s %d %.3fs %s",
                request.method,
                request.get_full_path(),
                response.status_code,
                duration,
                request.META.get("HTTP_USER_AGENT", "-")[:100],
            )

        return response
