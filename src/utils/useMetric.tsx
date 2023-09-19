import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const useMetric = () => {
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get("window"));

  // Define the metric functions
  const horizontalScale = (size) => (screenDimensions.width / guidelineBaseWidth) * size;
  const verticalScale = (size) => (screenDimensions.height / guidelineBaseHeight) * size;
  const moderateScale = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

  useEffect(() => {
    // Function to handle dimension changes
    const handleDimensionChange = ({ window }) => {
      // Update the screenDimensions state with the new dimensions
      setScreenDimensions(window);
    };

    // Add a listener for dimension changes and store it in a variable
    const dimensionChangeListener = Dimensions.addEventListener("change", handleDimensionChange);

    // Clean up the listener when the component unmounts
    return () => {
      // Remove the listener using the variable
      dimensionChangeListener.remove();
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return {
    horizontalScale,
    verticalScale,
    moderateScale
  };
};
