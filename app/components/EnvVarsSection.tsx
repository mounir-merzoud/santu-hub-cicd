"use client";

import { useState, useEffect } from "react";

export default function EnvVarsSection() {
  const [showEnvVars, setShowEnvVars] = useState(false);
  const [envVars, setEnvVars] = useState<Record<string, string>>({});
  const [loadingEnv, setLoadingEnv] = useState(false);

  // Récupération des variables d'environnement depuis l'API
  useEffect(() => {
    if (showEnvVars && Object.keys(envVars).length === 0 && !loadingEnv) {
      setLoadingEnv(true);
      fetch("/api/env")
        .then((res) => res.json())
        .then((data) => {
          setEnvVars(data);
          setLoadingEnv(false);
        })
        .catch((err) => {
          console.error("Erreur lors de la récupération des variables d'environnement:", err);
          setLoadingEnv(false);
        });
    }
  }, [showEnvVars]);

  return (
    <div className="mb-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border-2 border-gray-300 dark:border-gray-700 p-5 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Variables d'Environnement
        </h2>
        <button
          onClick={() => setShowEnvVars(!showEnvVars)}
          className="px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-700 transition-colors duration-200"
        >
          {showEnvVars ? "Masquer" : "Afficher"}
        </button>
      </div>
      {showEnvVars && (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {loadingEnv ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
              Chargement...
            </div>
          ) : Object.keys(envVars).length > 0 ? (
            Object.entries(envVars).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide min-w-[200px]">
                  {key}:
                </span>
                <span className="font-mono text-xs text-gray-900 dark:text-gray-100 break-all">
                  {value}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
              Aucune variable d'environnement trouvée
            </div>
          )}
        </div>
      )}
    </div>
  );
}

