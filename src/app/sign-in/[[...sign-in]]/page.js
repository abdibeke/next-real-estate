// sign-in/page.jsx
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-amber-50/30 pt-4 sm:pt-6 pb-4 sm:pb-6">
      <div className="w-full max-w-[400px] sm:max-w-[440px] bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-gray-200/80">
        {/* Header */}
        <div className="relative h-32 sm:h-36 bg-gradient-to-r from-amber-600 to-amber-700">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center mb-2 sm:mb-3 border border-white/20">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white">
              Sign In to Your Account
            </h1>
            <p className="text-amber-100/90 text-xs sm:text-sm">
              Manage your property listings and preferences
            </p>{" "}
          </div>
        </div>

        {/* Form container with bottom padding */}
        <div className="px-4 sm:px-6 pt-4 pb-6">
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none w-full p-0 m-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",

                // Social buttons
                socialButtons: "space-y-2",
                socialButtonsBlockButton:
                  "border border-gray-200/80 h-10 sm:h-11 text-sm rounded-lg m-0",

                // Form fields
                formField: "m-0",
                formFieldLabel: "text-sm text-gray-600/90 mb-1 font-medium",
                formFieldInput:
                  "h-10 sm:h-11 text-sm rounded-lg border-gray-300/80 m-0",
                formFieldAction: "text-xs text-gray-500/80 mt-1",

                // Actions
                formButtonPrimary:
                  "bg-gradient-to-r from-amber-600 to-amber-700 h-10 sm:h-11 text-sm rounded-lg mt-2",

                // Dividers
                dividerLine: "bg-gray-200/70 my-3",
                dividerText: "text-gray-500 text-xs px-2 bg-white font-medium",

                // Footer
                footer: "border-t border-gray-100/80 mt-3 pt-3",
                footerActionLink:
                  "text-amber-600 hover:text-amber-700 font-medium",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
