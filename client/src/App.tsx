import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.tsx";
import PrivateRoutes from "./layouts/PrivateRoutes.tsx";
import { PRIVATE_ROUTES } from "./routes.tsx";
import AuthRoutes from "./layouts/AuthRoutes.tsx";
import { ErrorPage, Register } from "./pages/index.tsx";
import Login from "./pages/Login.tsx";
import { ThemeProvider } from "@emotion/react";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { grey, red } from "@mui/material/colors";
import { create } from "zustand";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        <Route element={<PrivateRoutes />}>
          {PRIVATE_ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>
      <Route element={<AuthRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </>
  )
);

interface ThemeState {
  theme: "light" | "dark";
  switchTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  switchTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));

declare module "@mui/material/styles" {
  interface Theme {
    borderRadius: {
      primary: number;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    borderRadius?: {
      primary?: number;
    };
  }
}

function Fallback({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ marginInline: "auto" }}>
        <Typography>Something went wrong:</Typography>
        <Typography>{error.message}</Typography>
      </Container>
    </Box>
  );
}

const App = () => {
  const { theme: colorTheme } = useThemeStore();
  // A custom theme for this app
  const theme = createTheme({
    borderRadius: {
      primary: 2,
    },
    palette: {
      mode: colorTheme,
      primary: {
        main: "#800f2f",
      },
      secondary: {
        main: grey[200],
      },
      error: {
        main: red.A400,
      },
    },
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
