import { renderHook, waitFor, act } from "@testing-library/react";
import useTodoApi from "./useTodoApi";

beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("useTodoApi hook", () => {
    it("todos should initially be an empty array", () => {
        const { result } = renderHook(useTodoApi);
        expect(result.current.todos).toEqual([]);
        // expect(result.current.isLoading).toEqual(true);
    });

    it("should fetch todos", async () => {
        global.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                json: () => Promise.resolve([{ title: "new" }]),
            });
        });

        const { result } = renderHook(useTodoApi);

        act(() => {
            waitFor(() => {
                expect(result.current.todos).toEqual([{ title: "new" }]);
            });
        });
    });
});
