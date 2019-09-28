import React, { useRef, useEffect, useState, useMemo } from 'react';
// @ts-ignore
import hljs from 'highlight.js/lib/highlight';
// @ts-ignore
import javascript from 'highlight.js/lib/languages/javascript';
// @ts-ignore
import sql from 'highlight.js/lib/languages/sql';
// @ts-ignore
import shell from 'highlight.js/lib/languages/shell';
// @ts-ignore
import dockerfile from 'highlight.js/lib/languages/dockerfile';
// @ts-ignore
import yaml from 'highlight.js/lib/languages/yaml';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('dockerfile', dockerfile);
hljs.registerLanguage('yaml', yaml);

// import javascript from 'highlight.js/lib/languages';

import styled from 'styled-components';
import { DraculaTheme } from './styles';

interface Props {
  code: string;
  language: string;
}

const Holder = styled.div``;
const Code = styled.code`
  white-space: pre-wrap;
  font-family: monospace;
  font-size: 0.95rem;
  line-height: 1.5;
`;

export function SyntaxHighlight({ code, language }: Props) {
  const codeRef = useRef<HTMLPreElement>(null);

  // const initialContent = useMemo(
  //   () => Prism.highlight(code, Prism.languages[language], language),
  //   [],
  // );

  const [highlightedContent, setHighlightedContent] = useState('');

  useEffect(() => {
    hljs.highlightBlock(codeRef.current!);
    // const result = Prism.highlightElement(preRef.current!);
    // window.prism = Prism;
    // Prism.highlightAll();
    // console.log(result);
  }, [code]);

  return (
    <Holder>
      <DraculaTheme />
      <Code ref={codeRef} className={`language-${language}`}>
        {code}
      </Code>
    </Holder>
  );
}
