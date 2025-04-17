<template>
  <div class="app">
    <UContainer>
      <header class="my-6">
        <div class="flex items-center gap-4">
          <img src="/images/pawn_b_blue.svg" alt="OnChess Logo" class="w-10 h-10" />
          <h1 class="text-3xl font-bold">OnChess</h1>
        </div>
        <UDivider class="my-4" />
      </header>
      
      <main>
        <UCard class="mb-6">
          <template #header>
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-semibold">Welcome to OnChess</h2>
              <UIcon name="i-heroicons-chess" class="text-2xl" />
            </div>
          </template>
          
          <div class="py-4">
            <p class="mb-4">Your ultimate platform for online chess gaming and learning.</p>
            <p class="mb-4">Features coming soon:</p>
            <ul class="list-disc pl-6 mb-4">
              <li>Play chess online against friends or AI</li>
              <li>Learn chess strategies and tactics</li>
              <li>Analyze your games with powerful tools</li>
              <li>Join tournaments and improve your rating</li>
            </ul>
          </div>
          
          <template #footer>
            <div class="flex justify-end gap-2">
              <UButton color="gray">Learn More</UButton>
              <UButton color="primary">Get Started</UButton>
            </div>
          </template>
        </UCard>
      </main>
      
      <footer class="mt-8 text-center text-gray-500 text-sm">
        <p>© 2025 OnChess. All rights reserved.</p>
      </footer>
    </UContainer>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 1rem;
}
</style>
