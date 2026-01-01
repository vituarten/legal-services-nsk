export const useModal = () => {
  const consultationModal = () => {
    window.open('tel:+79931903500', '_self');
  };

  return {
    consultationModal
  };
};
