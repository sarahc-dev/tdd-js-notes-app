const getData = async () => {
    try {
        const response = await fetch("http://localhost:8080/todos");
        const todos = await response.json();
        return todos;
    } catch (err) {
        console.error(err);
    }
};

export { getData };
