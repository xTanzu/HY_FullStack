import deepFreeze from "deep-freeze"
import counterReducer from "./reducer"

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test("should return a proper initial state when called with undefined state", () => {
    const state = {}
    const action = {
      type: "DO_NOTHING"
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test("GOOD is incremented", () => {
    const action = {
      type: "GOOD"
    }
    const state = deepFreeze(initialState)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test("OK is incremented", () => {
    const action = {
      type: "OK"
    }
    const state = deepFreeze(initialState)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test("BAD is incremented", () => {
    const action = {
      type: "BAD"
    }
    const state = deepFreeze(initialState)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test("ZERO zeroes the state", () => {
    const incrementAction = {
      type: "GOOD"
    }
    const zeroAction = {
      type: "ZERO"
    }
    const state = deepFreeze(initialState)
    const interState = counterReducer(state, incrementAction)
    expect(interState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
    deepFreeze(interState)
    const newState = counterReducer(interState, zeroAction)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })

})
