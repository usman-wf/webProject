"use client";

import { useState, useEffect } from "react";
import useSupport from "../../../components/hooks/Support/useSupport";
import Loader from "../../../components/Loader/Loader";

const SupportPage = () => {
  const { supportInfo, isLoading, error } = useSupport();

  // Debug: Log the QR code URL when supportInfo is loaded and test accessibility
  useEffect(() => {
    if (supportInfo?.jazzcash?.qr_code_url) {
      const baseUrl = process.env.NEXT_PUBLIC_URL?.replace(/\/$/, "") || "";
      const imagePath = supportInfo.jazzcash.qr_code_url.startsWith("/")
        ? supportInfo.jazzcash.qr_code_url
        : `/${supportInfo.jazzcash.qr_code_url}`;
      const qrUrl = `${baseUrl}${imagePath}`;
      console.log("QR Code URL:", qrUrl);
      console.log("Base URL:", baseUrl);
      console.log("Image Path:", imagePath);

      // Test if the image URL is accessible
      fetch(qrUrl, { method: "HEAD", mode: "no-cors" })
        .then(() => {
          console.log("✅ Image URL appears accessible");
        })
        .catch((err) => {
          console.error("❌ Error accessing image URL:", err);
          console.log(
            "💡 Try opening this URL directly in your browser:",
            qrUrl
          );
        });
    }
  }, [supportInfo]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error || !supportInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            {error || "Failed to load support information"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Construct image URL - ensure proper formatting
  const baseUrl = process.env.NEXT_PUBLIC_URL?.replace(/\/$/, "") || "";
  let imageUrl = null;

  if (supportInfo.jazzcash?.qr_code_url) {
    // The backend returns /media/jazzcashQR.jpg
    // Construct full URL: http://localhost:8000/media/jazzcashQR.jpg
    const imagePath = supportInfo.jazzcash.qr_code_url.startsWith("/")
      ? supportInfo.jazzcash.qr_code_url
      : `/${supportInfo.jazzcash.qr_code_url}`;
    imageUrl = `${baseUrl}${imagePath}`;
  }

  return (
    <div className="w-full min-h-screen bg-slate-900 text-gray-200 p-6 lg:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Support Our Platform
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {supportInfo.message}
          </p>
        </div>

        {/* JazzCash Section */}
        <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2 text-yellow-400">
              JazzCash
            </h2>
            <p className="text-gray-400">
              {supportInfo.jazzcash?.instructions ||
                "Scan the QR code with your JazzCash app to send payment"}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            {imageUrl ? (
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <img
                  src={imageUrl}
                  alt="JazzCash QR Code"
                  width={300}
                  height={300}
                  className="rounded-lg w-[300px] h-[300px] object-contain"
                  onError={(e) => {
                    console.error(
                      "Failed to load QR code image. URL:",
                      imageUrl
                    );
                    console.error("Trying to access:", imageUrl);
                    // Try to fetch the image to see the actual error
                    fetch(imageUrl)
                      .then((response) => {
                        console.error(
                          "Fetch response status:",
                          response.status
                        );
                        console.error(
                          "Fetch response headers:",
                          response.headers
                        );
                      })
                      .catch((err) => {
                        console.error("Fetch error:", err);
                      });
                    // Show fallback message
                    e.target.style.display = "none";
                    const parent = e.target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="p-4 text-center">
                          <p class="text-red-500 mb-2">QR Code image could not be loaded.</p>
                          <p class="text-xs text-gray-500">URL: ${imageUrl}</p>
                          <p class="text-xs text-gray-500 mt-2">Please verify the image exists at: ${imageUrl}</p>
                        </div>
                      `;
                    }
                  }}
                  onLoad={() => {
                    console.log(
                      "✅ QR Code image loaded successfully:",
                      imageUrl
                    );
                  }}
                />
              </div>
            ) : (
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-yellow-400">QR Code image not available</p>
              </div>
            )}

            <div className="text-center lg:text-left space-y-4">
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-400 mb-2">Account Name</p>
                <p className="text-xl font-semibold text-white">
                  {supportInfo.jazzcash?.account_name || "Usman Wasif"}
                </p>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-400 mb-2">Account Number</p>
                <p className="text-xl font-semibold text-white">
                  {"030016238888"}
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      supportInfo.jazzcash?.account_number || "03001623888"
                    );
                    alert("Account number copied to clipboard!");
                  }}
                  className="mt-2 text-sm text-blue-400 hover:text-blue-300 underline"
                >
                  Copy Account Number
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-10 text-center">
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-6 border border-blue-700">
            <p className="text-lg text-gray-200 mb-2">
              💝 Thank you for your support!
            </p>
            <p className="text-sm text-gray-400">
              Your contributions help us maintain and improve this platform.
            </p>
            {supportInfo.support_email && (
              <p className="text-sm text-gray-400 mt-4">
                Questions? Contact us at{" "}
                <a
                  href={`mailto:${supportInfo.support_email}`}
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  {supportInfo.support_email}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
