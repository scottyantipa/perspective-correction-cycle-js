import xs from 'xstream';
import {run} from '@cycle/run';
import {div, input, p, makeDOMDriver, DOMSource} from '@cycle/dom';

export type Sources = {
  DOM: DOMSource,
};

type Mouse = {x: number, y: number} | undefined;

function main(sources: Sources) {
  const sinks = {
    DOM: sources.DOM.select('.container').events('click')
      .map((e: MouseEvent) : Mouse => {
        return { x: e.clientX, y: e.clientY };
      })
      .startWith(undefined)
      .map((m: Mouse) =>
        <div className="container">
          <img src="public/skewed-images/diandas.jpg" />
          {m && <div>x: {m.x}, y: {m.y}</div>}
        </div>
      )
  };
  return sinks;
}

run(main, {
  DOM: makeDOMDriver('#app'),
});
