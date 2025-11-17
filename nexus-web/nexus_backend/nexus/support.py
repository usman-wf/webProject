from ninja import NinjaAPI
from ninja.responses import Response
from ninja_jwt.authentication import JWTAuth
from django.conf import settings
from django.http import FileResponse, Http404
import os

support_router = NinjaAPI(urls_namespace='supportAPI')

@support_router.get("/support-info", auth=JWTAuth())
def get_support_info(request) -> Response:
    """
    Returns support/donation information for JazzCash
    Same QR code and account details for all users
    """
    if not request.user.is_authenticated:
        return Response({"error": "Unauthorized"}, status=401)
    
    # Same QR code image for all users - static file in media folder
    # Check if JazzCash QR code exists
    jazzcash_qr_path = os.path.join(settings.MEDIA_ROOT, 'jazzcashQR.jpg')
    jazzcash_qr_url = None
    if os.path.exists(jazzcash_qr_path):
        # Use the direct endpoint to serve the image
        # This ensures the image is accessible even if static file serving has issues
        jazzcash_qr_url = "/support/qr-code"
    
    # Same account details for all users
    support_info = {
        "jazzcash": {
            "qr_code_url": jazzcash_qr_url,  # Same QR code for everyone
            "account_name": "Usman Wasif",    # Same account for everyone
            "account_number": "3888",          # Same account number for everyone
            "instructions": "Scan the QR code with your JazzCash app to send payment"
        },
        "message": "Your support helps us continue building amazing features and maintaining this platform. Thank you for your generosity!",
        "support_email": "support@nexus.com"
    }
    
    return Response(support_info, status=200)


@support_router.get("/qr-code")
def get_qr_code_image(request):
    """
    Direct endpoint to serve the JazzCash QR code image
    Public endpoint - no authentication required since QR code is same for everyone
    """
    # Path to the QR code image
    jazzcash_qr_path = os.path.join(settings.MEDIA_ROOT, 'jazzcashQR.jpg')
    
    if os.path.exists(jazzcash_qr_path):
        return FileResponse(
            open(jazzcash_qr_path, 'rb'),
            content_type='image/jpeg',
            filename='jazzcashQR.jpg'
        )
    else:
        return Response({"error": "QR code image not found"}, status=404)

