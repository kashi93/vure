<?php

namespace Kashi93\Vure\Console;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Symfony\Component\Process\Process;
use RuntimeException;

class InstallReactBootStrapStack
{

    public function install(Command $command)
    {
        // NPM Packages
        $command->info('Updating Node dependencies.');
        $this->updateNodePackages();

        // Controllers
        $command->info('Installing controllers.');
        $this->updateController();

        // middleware
        $command->info('Installing middleware.');
        $this->updateMiddleware();

        // Routes
        $command->info('Installing routes.');
        $this->updateRoutes();

        // Resources
        $command->info('Installing resources.');
        $this->updateResources();

        copy(__DIR__ . '/../../stubs/react-bs/tsconfig.json', base_path('tsconfig.json'));
        copy(__DIR__ . '/../../stubs/react-bs/vite.config.js', base_path('vite.config.js'));

        $command->info('Installing and building Node dependencies.');

        if (file_exists(base_path('pnpm-lock.yaml'))) {
            $this->runCommands($command, ['pnpm install', 'pnpm run build']);
        } elseif (file_exists(base_path('yarn.lock'))) {
            $this->runCommands($command, ['yarn install', 'yarn run build']);
        } else {
            $this->runCommands($command, ['npm install', 'npm run build']);
        }

        $command->info('Vure react bootstrap scaffolding installed successfully.');
    }

    private function updateNodePackages()
    {
        $packageJson = base_path('package.json');
        if (!file_exists($packageJson)) {
            return;
        }
        $package = json_decode(file_get_contents($packageJson), true);

        if (!isset($package["dependencies"])) {
            $package["dependencies"] = [
                "react" => "^18.2.0",
                "react-dom" => "^18.2.0",
                "react-redux" => "^8.0.5",
                "react-router-dom" => "^6.11.1"
            ];
        } else {
            $package["dependencies"]["react"] = "^18.2.0";
            $package["dependencies"]["react-dom"] = "^18.2.0";
            $package["dependencies"]["react-redux"] = "^8.0.5";
            $package["dependencies"]["react-router-dom"] = "^6.11.1";
        }

        if (!isset($package["devDependencies"])) {
            $package["devDependencies"] = [
                "@types/node" => "^20.5.7",
                "@types/react" => "^18.2.15",
                "@types/react-dom" => "^18.2.7",
                "@vitejs/plugin-react" => "^4.0.3",
                "@vitejs/plugin-react-refresh" => "^1.3.6",
                "autoprefixer" => "^10.4.12",
                "axios" => "^1.1.2",
                "bootstrap" => "^5.3.1",
                "laravel-vite-plugin" => "^0.8.0",
                "sass" => "1.32.13",
                "typescript" => "^5.0.2",
                "vite" => "^4.0.0"
            ];
        } else {
            if (!isset($package["devDependencies"]["axios"])) {
                $package["devDependencies"]["axios"] = "^1.1.2";
            }

            $package["devDependencies"]["@types/node"] = "^20.5.7";
            $package["devDependencies"]["@types/react"] = "^18.2.15";
            $package["devDependencies"]["@types/react-dom"] = "^18.2.7";
            $package["devDependencies"]["@vitejs/plugin-react"] = "^4.0.3";
            $package["devDependencies"]["@vitejs/plugin-react-refresh"] = "^1.3.6";
            $package["devDependencies"]["autoprefixer"] = "^10.4.12";
            $package["devDependencies"]["bootstrap"] = "^5.3.1";
            $package["devDependencies"]["laravel-vite-plugin"] = "^0.8.0";
            $package["devDependencies"]["sass"] = "1.32.13";
            $package["devDependencies"]["typescript"] = "^5.0.2";
            $package["devDependencies"]["vite"] = "^4.0.0";
        }

        file_put_contents(
            $packageJson,
            json_encode($package, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . PHP_EOL
        );
    }

    private function updateController()
    {
        (new Filesystem)->ensureDirectoryExists(app_path('Http/Controllers'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/common/app/Http/Controllers', app_path('Http/Controllers'));
    }

    private function updateMiddleware()
    {
        (new Filesystem)->ensureDirectoryExists(app_path('Http/Middleware'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/common/app/Http/Middleware', app_path('Http/Middleware'));
    }

    private function updateRoutes()
    {
        copy(__DIR__ . '/../../stubs/common/routes/web.php', base_path('routes/web.php'));
        copy(__DIR__ . '/../../stubs/common/routes/api.php', base_path('routes/api.php'));
    }

    private function updateResources()
    {
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/react-bs/resources', resource_path());
    }

    /**
     * Run the given commands.
     *
     * @param  array  $commands
     * @return void
     */
    protected function runCommands(Command $command, $commands)
    {
        $process = Process::fromShellCommandline(implode(' && ', $commands), null, null, null, null);

        if ('\\' !== DIRECTORY_SEPARATOR && file_exists('/dev/tty') && is_readable('/dev/tty')) {
            try {
                $process->setTty(true);
            } catch (RuntimeException $e) {
                $command->writeln('  <bg=yellow;fg=black> WARN </> ' . $e->getMessage() . PHP_EOL);
            }
        }

        $process->run(function ($type, $line) use ($command) {
            $command->write('    ' . $line);
        });
    }
}
