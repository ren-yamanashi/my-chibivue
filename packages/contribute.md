# chibivue

## renderer

createRendererで、render関数を生成する

- render
  - ReactiveEffectの登録
    - コンポーネントの更新を行う(updateComponent)
      - patch処理
        - patch処理を行うタイミングは、レンダー関数が実行された時
        - elementの時と、textの時で、処理を分ける

render関数の実行は、createAppAPI関数の実行時に行われる(mount時)

※ setup関数内のreactiveステートが更新されたら、ReactiveEffectのtriggerが実行される(updateComponentなど)

※ 初回は、手動で`effect.run()`によって実行される
