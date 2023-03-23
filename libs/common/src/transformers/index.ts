export const IntoStringArray = (delimiter, notEmpty=false) =>
    ({ value }) => (v => v ? (notEmpty ? (v?.length ? v : null) : v) : null)(value?.split(new RegExp(delimiter, 'g'))?.filter(e => e));
