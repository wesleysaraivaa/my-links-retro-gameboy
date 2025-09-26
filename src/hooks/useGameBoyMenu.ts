import { useState, useEffect, useCallback } from 'react';
import type { DPadDirection, ActionButton, RegisterButtonHandler } from '../types/gameboy';

/**
 * Hook personalizado para gerenciar a navegação e interações do menu do Game Boy
 * 
 * @param links - Array de links/opções do menu
 * @param playSound - Função para reproduzir sons do Game Boy
 * @param onButtonPress - Callback para registrar handlers de botões
 * @returns Objeto com selectedIndex e setSelectedIndex
 */
export function useGameBoyMenu(
  links: Array<{ url: string }>,
  playSound: (type: 'menu' | 'select' | 'startup') => void,
  onButtonPress: RegisterButtonHandler
) {
  // Estado para controlar qual item do menu está selecionado
  const [selectedIndex, setSelectedIndex] = useState(0);

  /**
   * Handler para navegação com D-Pad
   * Gerencia movimento para cima, baixo, esquerda e direita
   */
  const handleNavigation = useCallback((direction: DPadDirection) => {
    switch (direction) {
      case 'up':
        // Move para o item anterior, ou vai para o último se estiver no primeiro
        setSelectedIndex(prev => {
          const newIndex = prev > 0 ? prev - 1 : links.length - 1;
          playSound('menu');
          return newIndex;
        });
        break;
      case 'down':
        // Move para o próximo item, ou volta para o primeiro se estiver no último
        setSelectedIndex(prev => {
          const newIndex = prev < links.length - 1 ? prev + 1 : 0;
          playSound('menu');
          return newIndex;
        });
        break;
      case 'left':
        // Movimento lateral (atualmente só reproduz som)
        playSound('menu');
        break;
      case 'right':
        // Movimento lateral (atualmente só reproduz som)
        playSound('menu');
        break;
    }
  }, [links.length, playSound]);

  /**
   * Handler para ações dos botões A, B, Select e Start
   * Gerencia abertura de links e outras ações
   */
  const handleAction = useCallback((button: ActionButton) => {
    switch (button) {
      case 'a':
      case 'start':
        // Botão A ou Start: abre o link selecionado em nova aba
        playSound('select');
        window.open(links[selectedIndex].url, '_blank');
        break;
      case 'b':
        // Botão B: ação de voltar (atualmente só reproduz som)
        playSound('menu');
        break;
      case 'select':
        // Botão Select: ação de seleção (atualmente só reproduz som)
        playSound('menu');
        break;
    }
  }, [links, selectedIndex, playSound]);

  /**
   * Registra os handlers de navegação e ação com o componente pai
   * Permite que os botões físicos do Game Boy controlem o menu
   */
  useEffect(() => {
    onButtonPress('navigation', handleNavigation);
    onButtonPress('action', handleAction);
  }, [handleNavigation, handleAction, onButtonPress]);

  /**
   * Listener para eventos de teclado
   * Permite navegação com teclado para melhor acessibilidade
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          handleNavigation('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleNavigation('down');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleNavigation('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNavigation('right');
          break;
        case 'Enter':
        case ' ':
          // Enter ou Espaço: equivalente ao botão A
          e.preventDefault();
          handleAction('a');
          break;
        case 'Escape':
          // Escape: equivalente ao botão B
          e.preventDefault();
          handleAction('b');
          break;
      }
    };
    
    // Adiciona o listener de teclado
    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup: remove o listener quando o componente é desmontado
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNavigation, handleAction]);

  // Retorna o estado e função de controle do menu
  return {
    selectedIndex,    // Índice do item atualmente selecionado
    setSelectedIndex, // Função para alterar o item selecionado
  };
} 