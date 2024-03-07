import React, { useRef, useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import './signup.css';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from '../schema';
import { toast } from "sonner";


const Signup = () => {
  const formRef = useRef(null);
  const handleSubmit = async (values) => {

    try {
      const response = await fetch('https://solstice-cjof.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
       window.location.href = "/login";
       toast("Account created");
      } else {
        throw new Error(data.message || 'Failed to signup');
      }
    } catch (error) {
      toast(error.message)
    }
  };

  const form = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });


  return (
    <div className="signup-container">
       <Form {...form}>

      <form ref={formRef} onSubmit={form.handleSubmit(handleSubmit)} className="signup-form">
        <h2>SIGNUP</h2>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" type="text"
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
        <button type="submit">Sign Up</button>
        <p className="signup-link">
          Already have an account? <Link className='link' to="/login">Login</Link>
        </p>
      </form>
      </Form>
    </div>
  );
};

export default Signup;
