import { useSharedValue, withTiming } from 'react-native-reanimated';

const useActiveTab = (initialTab) => {
  const activeTab = useSharedValue(initialTab);

  const setActiveTab = (tabName) => {
    activeTab.value = withTiming(tabName);
  };

  return [activeTab, setActiveTab];
};

export default useActiveTab;
