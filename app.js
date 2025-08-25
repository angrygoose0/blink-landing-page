import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
        const { error } = await supabase.from('signups').insert({ email: this.formEmail });
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
