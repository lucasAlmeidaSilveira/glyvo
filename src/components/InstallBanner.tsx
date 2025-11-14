'use client'

import { Download, Smartphone, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { usePWA } from '@/hooks/usePWA'

export function InstallBanner() {
  const { canInstall, installApp, isInstalled } = usePWA()
  const [isVisible, setIsVisible] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Verificar se o usuário já fechou o banner
    const hasUserDismissed = localStorage.getItem(
      'glyvo-install-banner-dismissed',
    )

    // Detectar se é iOS
    const userAgent = window.navigator.userAgent.toLowerCase()
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent)
    setIsIOS(isIOSDevice)

    // Mostrar banner apenas se:
    // 1. Não estiver instalado
    // 2. Puder instalar OU for iOS
    // 3. Usuário não tiver fechado o banner anteriormente
    if (!isInstalled && (canInstall || isIOSDevice) && !hasUserDismissed) {
      setIsVisible(true)
    }
  }, [canInstall, isInstalled])

  const handleDismiss = () => {
    // Salvar no localStorage que o usuário fechou o banner
    localStorage.setItem('glyvo-install-banner-dismissed', 'true')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed right-4 bottom-4 left-4 z-50 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-blue-100 p-2">
            <Smartphone className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Instalar Glyvo</h3>
            <p className="text-sm text-gray-600">
              {isIOS
                ? 'Toque em Compartilhar e depois em "Adicionar à Tela Inicial"'
                : 'Instale o app para acesso rápido e offline'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {!isIOS && canInstall && (
            <Button
              onClick={installApp}
              size="sm"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              <Download className="mr-1 h-4 w-4" />
              Instalar
            </Button>
          )}
          <Button
            onClick={handleDismiss}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
            title="Não mostrar novamente"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
