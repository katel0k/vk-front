# Front for vk

## Compilation

Run

```bash
npm i
npm run build
```

Resulting page will be in dist/index.html

For linter to work in vscode, typescript compiler needs to be set to current directory.

## Tests

```bash
npm run test
```

## Comments

API used is github repository search api. Without authorisation it has limited uses per hour - 60.

## Second task

EventEmitter is located in src/lib/ with its tests. Tests can be run with `npx jest`
