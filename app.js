const supabaseUrl = "https://lxvwqaywsjcpaudyzysj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4dndxYXl3c2pjcGF1ZHl6eXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwOTc1ODAsImV4cCI6MjA3MTY3MzU4MH0.x9oq05xbKKxhFDXRAMB5ob6_SrKMQTpGpr0QrGumh3E";

const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

// Theme initialization
(function setupTheme() {
  const metaTheme = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (metaTheme) metaTheme.setAttribute('content', '#F9E6EE');
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (metaTheme) metaTheme.setAttribute('content', '#A93765');
    }
  }

  // Initialize randomly on each load
  const initial = Math.random() < 0.5 ? 'light' : 'dark';
  applyTheme(initial);
})();

window.signup = function signup() {
  return {
    formEmail: '',
    loading: false,
    message: '',
    submitted: false,
    showThanks: false,
    hasError: false,
    isShaking: false,
    async submit() {
      if (!this.formEmail) {
        this.triggerError();
        return;
      }
      this.loading = true;
      this.message = '';
      this.hasError = false;
      try {
        const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        const { error } = await supabase
          .from('pre-sale')
          .insert({ email: this.formEmail, theme: currentTheme });
        if (error) {
          console.error(error);
          this.triggerError();
        } else {
          this.submitted = true;
          const thanksMessage = 'thank you !!';
          this.formEmail = '';
          setTimeout(() => {
            this.message = thanksMessage;
            this.showThanks = true;
          }, 300);
        }
      } catch (err) {
        console.error(err);
        this.triggerError();
      } finally {
        this.loading = false;
      }
    },
    triggerError() {
      this.hasError = true;
      this.isShaking = false;
      // Restart shake animation
      setTimeout(() => {
        this.isShaking = true;
        setTimeout(() => {
          this.isShaking = false;
        }, 500);
      }, 0);
    }
  };
};
