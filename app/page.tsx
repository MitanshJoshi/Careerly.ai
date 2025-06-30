"use client";
import Image from "next/image";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();

  return (
    <div>
      {/* Header */}
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-neutral-800 dark:border-neutral-700">
        <nav className="relative p-4 max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8" aria-label="Global">
          <div className="flex items-center gap-2">
            <Image src={'/logo.webp'} alt="Careerly.Ai logo" width={40} height={40} />
            <span className="text-xl font-bold text-[#025B9D] tracking-tight">Careerly.Ai</span>
          </div>
          <div className="flex items-center gap-4">
            {!user ? (
              <SignInButton mode='modal' signUpForceRedirectUrl={'/dashboard'}>
                <div className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 sm:border-s sm:border-gray-300 py-2 sm:py-0 sm:ms-4 sm:my-6 sm:ps-6 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500">
                  <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  </svg>
                  Get Started
                </div>
              </SignInButton>
            ) : (
              <UserButton />
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-x-2 bg-blue-100 border border-blue-200 text-sm text-blue-800 p-1 ps-3 rounded-full dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200">
              🚀 AI-Powered Career Tools
            </span>
          </div>
          <div className="mt-5 max-w-2xl text-center mx-auto">
            <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
              Supercharge Your Career with <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">AI</span>
            </h1>
          </div>
          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-600 dark:text-neutral-400">
              Careerly.Ai helps you analyze, plan, and accelerate your career journey with smart AI tools. Instantly generate personalized roadmaps, get resume feedback, and chat with an AI career coach—all in one place.
            </p>
          </div>
          <div className="mt-8 gap-3 flex justify-center">
            <a className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent cursor-pointer text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800"
              href="/dashboard">
              Get Started Free
              <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-neutral-100">What Can You Do With Careerly.Ai?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-stretch gap-6">
          {/* Feature 1 */}
          <div className="group flex flex-col justify-center bg-white hover:bg-blue-50 rounded-xl p-6 shadow dark:bg-neutral-800 dark:hover:bg-neutral-700 transition">
            <div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl mb-4">
              <svg className="flex-shrink-0 size-6 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="10" height="14" x="3" y="8" rx="2" /><path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" /><path d="M8 18h.01" /></svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">AI Resume Analyzer</h3>
            <p className="text-gray-600 dark:text-neutral-400 mb-3">Get instant, actionable feedback on your resume and tips to stand out to recruiters.</p>
          </div>
          {/* Feature 2 */}
          <div className="group flex flex-col justify-center bg-white hover:bg-blue-50 rounded-xl p-6 shadow dark:bg-neutral-800 dark:hover:bg-neutral-700 transition">
            <div className="flex justify-center items-center size-12 bg-violet-600 rounded-xl mb-4">
              <svg className="flex-shrink-0 size-6 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" /></svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Career Roadmap Generator</h3>
            <p className="text-gray-600 dark:text-neutral-400 mb-3">Generate a personalized learning and career roadmap for your dream role or skill.</p>
          </div>
          {/* Feature 3 */}
          <div className="group flex flex-col justify-center bg-white hover:bg-blue-50 rounded-xl p-6 shadow dark:bg-neutral-800 dark:hover:bg-neutral-700 transition">
            <div className="flex justify-center items-center size-12 bg-green-600 rounded-xl mb-4">
              <svg className="flex-shrink-0 size-6 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">AI Career Chat</h3>
            <p className="text-gray-600 dark:text-neutral-400 mb-3">Ask career questions and get instant, expert advice from our AI career coach.</p>
          </div>
          {/* Feature 4 */}
          <div className="group flex flex-col justify-center bg-white hover:bg-blue-50 rounded-xl p-6 shadow dark:bg-neutral-800 dark:hover:bg-neutral-700 transition">
            <div className="flex justify-center items-center size-12 bg-yellow-500 rounded-xl mb-4">
              <svg className="flex-shrink-0 size-6 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M12 4v16" /><path d="M4 4v16" /></svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Track Your Progress</h3>
            <p className="text-gray-600 dark:text-neutral-400 mb-3">Save your history, revisit your roadmaps, and monitor your career growth over time.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-gradient-to-br from-blue-100 to-violet-100 dark:from-neutral-800 dark:to-neutral-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-neutral-100 mb-4">Ready to take the next step?</h2>
          <p className="text-gray-600 dark:text-neutral-400 mb-6">Join Careerly.Ai and unlock your full potential with the power of AI.</p>
          <a href="/dashboard" className="inline-flex justify-center items-center gap-x-3 bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 text-white text-sm font-medium rounded-md py-3 px-6 shadow-lg transition">
            Get Started Free
            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </a>
        </div>
      </section>
    </div>
  );
}
