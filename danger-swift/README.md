### Runs 

```workflow
workflow "Danger Swift" {
  on = "pulls"
  resolves = ""
}

action "ACTION1" {
  uses = "docker://image1"
}
```
