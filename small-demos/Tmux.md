tmux
====

I still keep the default `prefix-key` which is `C-b` (control b).
It's not great in terms of contorting the left pinkie and left index finger.
You can practice with left pinkie and left thumb.

# Joining Two Windows

If you have started many new windows, or broken out too many panes,
you may want to unify them again.

```
prefix-key :join-pane -t 0 -s 1
```
This joins a source window (with a single pane) of id 0 with a target window (with a single pane) of id 1.
