declare module "micromodal" {
    interface MicroModalOptions {
      openTrigger?: string;
      closeTrigger?: string;
      disableScroll?: boolean;
      disableFocus?: boolean;
      awaitOpenAnimation?: boolean;
      awaitCloseAnimation?: boolean;
      debugMode?: boolean;
      onShow?: (modal: HTMLElement) => void;
      onClose?: (modal: HTMLElement) => void;
    }
  
    const MicroModal: {
      init: (options?: MicroModalOptions) => void;
      show: (modalId: string, options?: MicroModalOptions) => void;
      close: (modalId?: string) => void;
    };
  
    export default MicroModal;
  }
  