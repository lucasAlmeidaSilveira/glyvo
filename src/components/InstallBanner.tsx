'use client';

import { useState, useEffect } from 'react';
import { usePWA } from '@/hooks/usePWA';
import { X, Download, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function InstallBanner() {
  const { canInstall, installApp, isInstalled } = usePWA();
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detectar se é iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    // Mostrar banner se não estiver instalado e puder instalar
    if (!isInstalled && (canInstall || isIOSDevice)) {
      setIsVisible(true);
    }
  }, [canInstall, isInstalled]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Smartphone className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Instalar Glyvo</h3>
            <p className="text-sm text-gray-600">
              {isIOS 
                ? 'Toque em Compartilhar e depois em "Adicionar à Tela Inicial"'
                : 'Instale o app para acesso rápido e offline'
              }
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {!isIOS && canInstall && (
            <Button
              onClick={installApp}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Download className="h-4 w-4 mr-1" />
              Instalar
            </Button>
          )}
          <Button
            onClick={() => setIsVisible(false)}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
