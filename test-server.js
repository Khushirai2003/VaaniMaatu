// Simple test to check if server starts without errors
import('./dist/index.js')
  .then(() => {
    console.log('✅ Server started successfully');
    setTimeout(() => {
      console.log('✅ Server running for 3 seconds without errors');
      process.exit(0);
    }, 3000);
  })
  .catch((error) => {
    console.error('❌ Server failed to start:', error.message);
    process.exit(1);
  });