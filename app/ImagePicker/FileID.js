export default () => {
    var dt = new Date(Date.now()).getTime();
    return dt + Math.random().toString(36).substr(2, 9);
}