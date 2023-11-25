export const dropVariant = {
    hidden: {
      y: -250, // Start position off-screen
      opacity: 0,
    },
    visible: {
      y: 0, // End position at the top of the screen
      opacity: 1,
      transition: {
        type: "spring", // You can use different transition types (spring, ease, etc.)
        damping: 10,
        stiffness: 100,
      },
    },
    exit: {
      y: -1000, // Off-screen when exiting
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };



  export const blurInVariant = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1,  transition: {
      duration: 1,
    },},
  };