import { NextResponse } from "next/server";

export async function GET() {
  // Récupération uniquement des variables d'environnement du .env
  const envVars = Object.keys(process.env)
    .filter((key) => {
      // Ne garder que les variables qui semblent être des variables d'application
      // (commencent par des lettres majuscules ou contiennent des underscores)
      return /^[A-Z][A-Z0-9_]*$/.test(key);
    })
    .sort()
    .reduce((acc, key) => {
      const value = process.env[key];
      if (value && value.length > 0) {
        const lowerKey = key.toLowerCase();
        // Masquer partiellement les valeurs potentiellement sensibles
        if (
          lowerKey.includes("key") ||
          lowerKey.includes("api") ||
          lowerKey.includes("auth") ||
          lowerKey.includes("token")
        ) {
          acc[key] = value.length > 8 ? `${value.substring(0, 4)}...${value.substring(value.length - 4)}` : "***";
        } else {
          acc[key] = value;
        }
      }
      return acc;
    }, {} as Record<string, string>);

  return NextResponse.json(envVars);
}

