import z from "zod";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth/web-extension";

const createLoginSchema = z.object({
  email: z.email(),
  password: z.string().nonempty("Password cannot be empty")
});

export interface LoginState {
  success: boolean;
  message?: string;
  errors?:
    | {
        email?: string[] | undefined;
        password?: string[] | undefined;
      }
    | undefined;
}

export const loginAction = async (
  _prevState: LoginState, // The first argument is the state, NOT the form data
  formData: FormData,
): Promise<LoginState> => {
  // Must return the same LoginState type

  const validatedFields = createLoginSchema.safeParse(
    Object.fromEntries(formData),
  );
  //Enums for state?
  if (!validatedFields.success) {
    const validationerrors = z.treeifyError(validatedFields.error).properties;
    return {
      success: false,
      errors: {
        email: validationerrors?.email?.errors,
        password: validationerrors?.password?.errors,
      },
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true, message: "Logged in successfully!" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to login",
    };
  }
};
