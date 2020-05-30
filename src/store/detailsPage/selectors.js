export const selectPageData = (state) => {
  return {
    homepages: state.details.homepages,
    stories: state.details.stories,
  };
};
