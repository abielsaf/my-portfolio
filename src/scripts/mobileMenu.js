export function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileWrapper = document.getElementById('mobile-menu-wrapper');

  if (!menuButton || !mobileWrapper) return;

  function openMenu() {
    mobileWrapper.classList.remove('hidden');
    setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
    }, 0);
  }

  function closeMenu() {
    mobileWrapper.classList.add('hidden');
    document.removeEventListener('click', handleOutsideClick);
  }

  function handleOutsideClick(e) {
    const target = e.target;
    if (!mobileWrapper.contains(target) && target !== menuButton) {
      closeMenu();
    }
  }

  menuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = mobileWrapper.classList.contains('hidden');
    isHidden ? openMenu() : closeMenu();
  });

  mobileWrapper.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}


  