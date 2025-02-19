"use client";

import {signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().default(false),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      console.log("Signing in with:", values.email, values.password); 

      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      
      console.log("User Logged In:", user); 

      toast({
        title: "Success!",
        description: "You have successfully logged in.",
      });

      router.push("/"); 
      console.log("Redirecting to /");

    } catch (error: any) {
      console.error("Login Error:", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Enter your credentials to access your account</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">Remember me</FormLabel>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>
        </Form>
        <div className="flex items-center justify-between mt-4">
          <Button variant="link" className="px-0 text-sm">Forgot password?</Button>
          <Link href="/signup"><Button variant="link" className="px-0 text-sm">Sing up</Button></Link>
        </div>
      </div>
    </div>
  );
}


















// import Link from 'next/link';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       alert('Login Successful!');
//     } catch (err) {
//       setError('Invalid email or password.');
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
//         {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//         <p className="text-sm text-center mt-4">
//           Don't have an account? <Link href="/signup" className="text-blue-600">Sign Up</Link>
//         </p>
//       </div>
//     </div>
//   );
// }












// import { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// // import { auth } from '../lib/firebase';
// import { useRouter } from 'next/router';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage('');

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       router.push('/'); // Redirect to dashboard after successful login
//     } catch (error) {
//       setErrorMessage('Invalid username or password');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg"
//               required
//             />
//           </div>
//           {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
//           <div className="flex items-center justify-between">
//             <label className="inline-flex items-center">
//               <input type="checkbox" className="mr-2" />
//               Remember Me
//             </label>
//             <a href="#" className="text-blue-500 hover:text-blue-600">Forgot Password?</a>
//           </div>
//           <button
//             type="submit"
//             className={`w-full bg-blue-600 text-white py-2 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//             disabled={loading}
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//           <div className="text-center mt-4">
//             <p>Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a></p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }









// // pages/login.tsx
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// // import { auth, signInWithEmailAndPassword } from '../lib/firebase'; // Import Firebase auth

// const LoginPage = () => {
//   const [mounted, setMounted] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return <div>Loading...</div>;
//   }

//   const handleLogin = async (event: React.FormEvent) => {
//     event.preventDefault();
//     const form = event.target as HTMLFormElement;
//     const email = form.username.value;
//     const password = form.password.value;

//     try {
//       // Using the Firebase modular API for login
//       await signInWithEmailAndPassword(auth, email, password);
//       router.push('/dashboard');
//     } catch (error:any) {
//       alert('Login failed: ' + error.message);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div className="input-group">
//           <label htmlFor="username">Username / Email:</label>
//           <input
//             type="email"
//             id="username"
//             name="username"
//             placeholder="Enter your username or email"
//             required
//           />
//         </div>

//         <div className="input-group">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             placeholder="Enter your password"
//             required
//           />
//         </div>

//         <div className="checkbox-group">
//           <label>
//             <input type="checkbox" /> Remember Me
//           </label>
//         </div>

//         <div className="button-group">
//           <button type="submit">Login</button>
//         </div>
//       </form>

//       <div className="links">
//         <a href="/forgot-password">Forgot Password?</a>
//         <br />
//         <a href="/signup">Sign Up</a>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;









// "use client";  // This ensures the component is treated as a client-side component

  // Next.js client-side routing hook
// import { auth, signInWithEmailAndPassword } from '../../lib/firebase';  // Correct import paths


// app/login/page.tsx

// "use client"; // Marking the component as a client-side component

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router"; // Import the useRouter hook from Next.js
// import { auth, signInWithEmailAndPassword } from "../../lib/firebase"; // Make sure the Firebase import is correct



// "use client"; // Ensure this is at the top

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";  // Import useRouter from Next.js
// import { auth, signInWithEmailAndPassword } from "../../lib/firebase"; // Firebase import for auth
