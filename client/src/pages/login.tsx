import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff, User, Lock, ArrowRight } from "lucide-react";

export default function Login() {
  const { language } = useLanguage();
  const { login, register } = useAuth();
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (isRegistering) {
      if (register(formData.username, formData.password)) {
        setSuccess(language === 'kannada' ? 'ಖಾತೆ ಯಶಸ್ವಿಯಾಗಿ ರಚಿಸಲಾಗಿದೆ! ಈಗ ಲಾಗಿನ್ ಮಾಡಿ' : 'Account created successfully! Now login');
        setIsRegistering(false);
        setFormData({ username: "", password: "" });
      } else {
        setError(language === 'kannada' ? 'ಬಳಕೆದಾರ ಈಗಾಗಲೇ ಅಸ್ತಿತ್ವದಲ್ಲಿದೆ' : 'Username already exists');
      }
    } else {
      if (login(formData.username, formData.password)) {
        setLocation("/");
      } else {
        setError(language === 'kannada' ? 'ತಪ್ಪು ಬಳಕೆದಾರ ಹೆಸರು ಅಥವಾ ಗುಪ್ತಪದ' : 'Invalid username or password');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full opacity-20 animate-bounce"></div>
      </div>
      
      <Card className="w-full max-w-md p-8 bg-gradient-to-br from-white via-blue-50 to-purple-50 shadow-2xl border-4 border-white backdrop-blur-lg relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl animate-pulse border-4 border-white">
            <User className="w-10 h-10 text-white animate-bounce" />
          </div>
          <h1 className={`text-3xl font-bold text-gray-900 mb-2 ${language === 'kannada' ? 'kannada-text' : ''}`}>
            {isRegistering 
              ? (language === 'kannada' ? 'ಖಾತೆ ರಚಿಸಿ' : 'Create Account')
              : (language === 'kannada' ? 'ಲಾಗಿನ್' : 'Login')
            }
          </h1>
          <p className={`text-gray-600 ${language === 'kannada' ? 'kannada-text' : ''}`}>
            {isRegistering
              ? (language === 'kannada' ? 'ಹೊಸ ಖಾತೆ ರಚಿಸಿ' : 'Create a new account')
              : (language === 'kannada' ? 'ನಿಮ್ಮ ಖಾತೆಗೆ ಪ್ರವೇಶಿಸಿ' : 'Access your voice therapy account')
            }
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-300 rounded-xl shadow-lg">
            <p className={`text-sm text-red-700 text-center font-medium ${language === 'kannada' ? 'kannada-text' : ''}`}>
              {error}
            </p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-xl shadow-lg animate-bounce">
            <p className={`text-sm text-green-700 text-center font-medium ${language === 'kannada' ? 'kannada-text' : ''}`}>
              {success}
            </p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="username" className={`text-sm font-medium text-gray-700 ${language === 'kannada' ? 'kannada-text' : ''}`}>
              {language === 'kannada' ? 'ಬಳಕೆದಾರ ಹೆಸರು' : 'Username'}
            </Label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500" />
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="pl-10 h-12 border-3 border-pink-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-200 bg-gradient-to-r from-white to-blue-50 rounded-xl shadow-lg"
                placeholder={language === 'kannada' ? 'ನಿಮ್ಮ ಬಳಕೆದಾರ ಹೆಸರು ನಮೂದಿಸಿ' : 'Enter your username'}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className={`text-sm font-medium text-gray-700 ${language === 'kannada' ? 'kannada-text' : ''}`}>
              {language === 'kannada' ? 'ಗುಪ್ತಪದ' : 'Password'}
            </Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10 pr-10 h-12 border-3 border-pink-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-200 bg-gradient-to-r from-white to-blue-50 rounded-xl shadow-lg"
                placeholder={language === 'kannada' ? 'ನಿಮ್ಮ ಗುಪ್ತಪದ ನಮೂದಿಸಿ' : 'Enter your password'}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 border-2 border-white"
          >
            <span className={`${language === 'kannada' ? 'kannada-text' : ''}`}>
              {isRegistering
                ? (language === 'kannada' ? 'ಖಾತೆ ರಚಿಸಿ' : 'Create Account')
                : (language === 'kannada' ? 'ಲಾಗಿನ್' : 'Login')
              }
            </span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </form>

        {/* Toggle between Login/Register */}
        <div className="mt-6 text-center">
          <p className={`text-sm text-gray-600 mb-2 ${language === 'kannada' ? 'kannada-text' : ''}`}>
            {isRegistering
              ? (language === 'kannada' ? 'ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿದ್ದೀರಾ?' : 'Already have an account?')
              : (language === 'kannada' ? 'ಖಾತೆ ಇಲ್ಲವೇ?' : "Don't have an account?")
            }
          </p>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError("");
              setSuccess("");
              setFormData({ username: "", password: "" });
            }}
            className={`text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text hover:from-purple-600 hover:to-blue-600 font-semibold ${language === 'kannada' ? 'kannada-text' : ''}`}
          >
            {isRegistering
              ? (language === 'kannada' ? 'ಲಾಗಿನ್ ಮಾಡಿ' : 'Login here')
              : (language === 'kannada' ? 'ಖಾತೆ ರಚಿಸಿ' : 'Create account')
            }
          </Button>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-2">
          <Link href="/" className="text-sm text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text hover:from-purple-600 hover:to-pink-600 block font-medium">
            {language === 'kannada' ? 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ' : 'Back to Home'}
          </Link>
        </div>
      </Card>
    </div>
  );
}