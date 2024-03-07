import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import './login.css';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from '../schema';
import { cn } from '../lib/utils';

const Login = () => {

  const [isLoading,setIsLoading] = useState(true);
  
  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://solstice-cjof.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userId', data.userId);
        window.location.href=("/homepage");
      } else {
        throw new Error(data.message || 'Failed to login');
      }
       setIsLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  
  return (
    <div className="login-container">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="login-form">
        <h2>LOGIN</h2>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" type="text" className={cn("", {
                  "form-error":field.error
                })}
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <button type="submit">{isLoading ? 'creating...' :'Log In'}</button>
        <p className="login-link">
          Don't have an account? <Link className='link' to="/signup">Sign Up</Link>
        </p>
      </form>
      </Form>
    </div>
  );
};

export default Login;
