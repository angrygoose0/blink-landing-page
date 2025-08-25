const supabaseUrl = "https://lxvwqaywsjcpaudyzysj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4dndxYXl3c2pjcGF1ZHl6eXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwOTc1ODAsImV4cCI6MjA3MTY3MzU4MH0.x9oq05xbKKxhFDXRAMB5ob6_SrKMQTpGpr0QrGumh3E";

const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

window.signup = function signup() {
  return {
    formEmail: '',
    loading: false,
    message: '',
    async submit() {
      if (!this.formEmail) {
        this.message = 'Please enter an email.';
        return;
      }
      this.loading = true;
      this.message = '';
      try {
        const { error } = await supabase.from('pre-sale').insert({ email: this.formEmail });
        if (error) {
          this.message = 'Something went wrong. Please try again.';
          console.error(error);
        } else {
          this.message = 'Thanks — you are on the list!';
          this.formEmail = '';
        }
      } catch (err) {
        this.message = 'Unexpected error. Please try again.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    }
  };
};
