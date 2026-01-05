export const useModal = () => {
  const consultationModal = () => {
    window.open('tel:+7 (383) 235-95-05', '_self');
  };

  return {
    consultationModal
  };
};
