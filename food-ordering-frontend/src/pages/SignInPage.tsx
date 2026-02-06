import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import * as authApi from "@/api/authApi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const testAccounts = {
  "guest-user": { email: "test@user.com", password: "12345678" },
};

type FormData = { email: string; password: string };

const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();

  const handleRoleSelect = (value: string) => {
    if (value === "clear") {
      setSelectedRole("");
      setValue("email", "");
      setValue("password", "");
    } else {
      setSelectedRole(value);
      const account = testAccounts[value as keyof typeof testAccounts];
      if (account) {
        setValue("email", account.email);
        setValue("password", account.password);
      }
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await authApi.signIn(data);
      await queryClient.invalidateQueries("validateToken");
      toast.success("Signed in successfully!");
      navigate((location.state as { from?: { pathname: string } })?.from?.pathname || "/");
      window.location.reload();
    } catch (err: unknown) {
      toast.error((err as Error)?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
    window.location.href = `${apiUrl}/api/auth/google`;
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-center">Sign In</h1>

        <div className="space-y-2">
          <Label>Test Accounts To Login With</Label>
          <Select
            key={`select-${selectedRole || "empty"}`}
            value={selectedRole || undefined}
            onValueChange={handleRoleSelect}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Role Based Test Account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="guest-user">Guest User (test@user.com)</SelectItem>
              {selectedRole && (
                <SelectItem value="clear" className="text-gray-400 opacity-60">
                  Clear Selection
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password", { required: "Password is required", minLength: 6 })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          Continue with Google
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-medium text-orange-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
