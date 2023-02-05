import Layout from './layout';
import Router from './routes';
import { ThemeProvider } from './theme/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Router />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
