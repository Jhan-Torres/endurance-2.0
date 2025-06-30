<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 sm:py-32" role="banner">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] dark:opacity-20" aria-hidden="true"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="text-center animate-fade-in">
          <h1 class="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Your Personal
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600">
              Digital Manager
            </span>
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Securely manage your passwords, organize your thoughts with notes, and curate your reading list - all in one beautiful, intuitive platform.
          </p>
          
          <nav class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12" aria-label="Hero actions">
            <router-link
              to="/passwords"
              class="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              aria-describedby="get-started-description"
            >
              Get Started
              <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </router-link>
            <button 
              class="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold rounded-xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transform hover:-translate-y-1 transition-all duration-300"
              aria-describedby="learn-more-description"
            >
              Learn More
            </button>
          </nav>
          <div id="get-started-description" class="sr-only">Navigate to password manager to begin organizing your digital life</div>
          <div id="learn-more-description" class="sr-only">Learn more about Personal Manager features and capabilities</div>

          <!-- Feature Preview Cards -->
          <section class="grid md:grid-cols-3 gap-8 mt-16 animate-slide-up" aria-labelledby="features-heading">
            <h2 id="features-heading" class="sr-only">Main Features</h2>
            
            <article class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div class="text-4xl mb-4 animate-bounce-gentle" aria-hidden="true">🔐</div>
              <header>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Password Manager</h3>
              </header>
              <p class="text-gray-600 dark:text-gray-300 mb-4">Generate strong passwords and store them securely with advanced strength analysis.</p>
              <footer>
                <router-link to="/passwords" class="text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200">
                  Manage Passwords →
                </router-link>
              </footer>
            </article>

            <article class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div class="text-4xl mb-4 animate-bounce-gentle" style="animation-delay: 0.2s" aria-hidden="true">📝</div>
              <header>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Smart Notes</h3>
              </header>
              <p class="text-gray-600 dark:text-gray-300 mb-4">Organize your thoughts and ideas with our intuitive note-taking system.</p>
              <footer>
                <router-link to="/notes" class="text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200">
                  Create Notes →
                </router-link>
              </footer>
            </article>

            <article class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div class="text-4xl mb-4 animate-bounce-gentle" style="animation-delay: 0.4s" aria-hidden="true">📚</div>
              <header>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Book Library</h3>
              </header>
              <p class="text-gray-600 dark:text-gray-300 mb-4">Curate your reading list with ratings and track your current reads.</p>
              <footer>
                <router-link to="/books" class="text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200">
                  Browse Books →
                </router-link>
              </footer>
            </article>
          </section>
        </header>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white dark:bg-gray-800 transition-colors duration-300" aria-labelledby="detailed-features-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="text-center mb-16">
          <h2 id="detailed-features-heading" class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need in One Place
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Streamline your digital life with our comprehensive suite of personal management tools.
          </p>
        </header>

        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <section aria-labelledby="benefits-heading">
            <h3 id="benefits-heading" class="sr-only">Key Benefits</h3>
            <ul class="space-y-8" role="list">
              <li class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center" aria-hidden="true">
                  <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bank-Level Security</h4>
                  <p class="text-gray-600 dark:text-gray-300">Your data is stored locally with advanced encryption, ensuring complete privacy and security.</p>
                </div>
              </li>

              <li class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center" aria-hidden="true">
                  <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h4>
                  <p class="text-gray-600 dark:text-gray-300">Built with modern web technologies for instant loading and smooth interactions.</p>
                </div>
              </li>

              <li class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center" aria-hidden="true">
                  <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Mobile Responsive</h4>
                  <p class="text-gray-600 dark:text-gray-300">Access your data seamlessly across all devices with our responsive design.</p>
                </div>
              </li>
            </ul>
          </section>

          <aside class="relative" aria-label="Application preview">
            <div class="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-4">
                <div class="flex items-center space-x-3" aria-hidden="true">
                  <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div class="space-y-3" aria-hidden="true">
                  <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                  <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                  <div class="h-4 bg-primary-200 dark:bg-primary-800 rounded w-5/6"></div>
                  <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900" aria-labelledby="cta-heading">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <header>
          <h2 id="cta-heading" class="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Get Organized?
          </h2>
          <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have simplified their digital lives with our personal management platform.
          </p>
        </header>
        <router-link
          to="/passwords"
          class="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:bg-gray-50"
        >
          Start Managing Now
          <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Landing page component
</script>