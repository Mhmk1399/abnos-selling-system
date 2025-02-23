'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignInPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    password: ''
  })
  console.log(formData);
  
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await res.json()
      if (data.token) {
        localStorage.setItem('token', data.token)
        router.push('/')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-7 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">Welcome</h1>
                <form onSubmit={handleSubmit} className="space-y-6 lg:w-[300px]" dir='rtl'>
                  <div className="relative group">
                    <input
                      type="text"
                      required
                      className="w-full h-10 px-3 text-sm peer bg-transparent border-b-2 border-gray-300 focus:border-indigo-600 focus:outline-none"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <label className="transform transition-all absolute top-2 right-0 h-full flex items-center pl-4 text-sm group-focus-within:text-sm peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 text-gray-500 group-focus-within:text-indigo-600">
                      نام کاربری
                    </label>
                  </div>

                  <div className="relative group">
                    <input
                      type="tel"
                      required
                      className="w-full h-10 px-3 text-sm peer bg-transparent border-b-2 border-gray-300 focus:border-indigo-600 focus:outline-none"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    />
                    <label className="transform transition-all absolute top-2 right-0 h-full flex items-center pl-4 text-sm group-focus-within:text-sm peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 text-gray-500 group-focus-within:text-indigo-600">
                      شماره همراه
                    </label>
                  </div>

                  <div className="relative group">
                    <input
                      type="password"
                      required
                      className="w-full h-10 px-3 text-sm peer bg-transparent border-b-2 border-gray-300 focus:border-indigo-600 focus:outline-none"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <label className="transform transition-all absolute top-2 right-0 h-full flex items-center pl-4 text-sm group-focus-within:text-sm peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 text-gray-500 group-focus-within:text-indigo-600">
                      رمز عبور
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                  >
                    {loading ? (
                      <span className="animate-pulse">Signing in...</span>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                  <Link href="/login" className="text-indigo-600 hover:text-indigo-700 text-center block py-3 transition duration-150 ease-in-out hover:underline underline-offset-2">
                    حساب کاربری دارید؟ ورود
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
