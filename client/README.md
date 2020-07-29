# What I've Learned

### Learning React
describe website

### Transfering Data Between nodes
I ran into this issue when first developing with React.
I'll give an example of what I am attempting to do. I have three components A, B, C. B and C are child components of A, say A is the root node in a tree. B renders data in a list to the screen. C renders a button that when pressed, collects data. That data needs to propagate up to A, then out to B. B needs to somehow periodically update (I think it updates if prop data changes), then append that new piece of data to its list. In my exact scenario. The tree height is taller than described here. Conceptually it's the same but it's making me hesitant on passing data through multiple nodes. I think there may be a better way to solve this. I was wondering if there is a way to build a bridge between nodes B and C? Such as a global cache maybe? An object that C can push new data to. And B can periodically check if new data has been pushed to that data object? Not sure how to proceed efficiently without hard-coding through multiple nodes data I want to transfer.

I found the answer to this issue was to use a predictable state container like Redux.

## References:
[1] https://scrimba.com/g/glearnreact