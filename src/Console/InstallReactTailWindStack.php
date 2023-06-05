<?php

namespace Kashi93\Vure\Console;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Symfony\Component\Process\Process;
use RuntimeException;

class InstallReactTailWindStack
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

        copy(__DIR__ . '/../../stubs/react-tw/tsconfig.json', base_path('tsconfig.json'));
        copy(__DIR__ . '/../../stubs/react-tw/vite.config.js', base_path('vite.config.js'));
        copy(__DIR__ . '/../../stubs/react-tw/postcss.config.js', base_path('postcss.config.js'));
        copy(__DIR__ . '/../../stubs/react-tw/tailwind.config.js', base_path('tailwind.config.js'));

        $command->info('Installing and building Node dependencies.');

        if (file_exists(base_path('pnpm-lock.yaml'))) {
            $this->runCommands($command, ['pnpm install', 'pnpm run build']);
        } elseif (file_exists(base_path('yarn.lock'))) {
            $this->runCommands($command, ['yarn install', 'yarn run build']);
        } else {
            $this->runCommands($command, ['npm install', 'npm run build']);
        }

        $command->info('Vure react tailwind scaffolding installed successfully.');
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
                "@types/node" => "^20.1.0",
                "@vitejs/plugin-react-refresh" => "^1.3.6",
                "react" => "^18.2.0",
                "react-dom" => "^18.2.0",
                "react-redux" => "^8.0.5",
                "react-router-dom" => "^6.11.1"
            ];
        } else {
            $package["dependencies"]["@types/node"] = "^20.1.0";
            $package["dependencies"]["@vitejs/plugin-react-refresh"] = "^1.3.6";
            $package["dependencies"]["react"] = "^18.2.0";
            $package["dependencies"]["react-dom"] = "^18.2.0";
            $package["dependencies"]["react-redux"] = "^8.0.5";
            $package["dependencies"]["react-router-dom"] = "^6.11.1";
        }

        if (!isset($package["devDependencies"])) {
            $package["devDependencies"] = [
                "@headlessui/react" => "^1.7.14",
                "@tailwindcss/forms" => "^0.5.3",
                "@types/react" => "^18.2.6",
                "@types/react-dom" => "^18.2.4",
                "@vitejs/plugin-react" => "^4.0.0",
                "autoprefixer" => "^10.4.12",
                "axios" => "^1.1.2",
                "laravel-vite-plugin" => "^0.7.5",
                "postcss" => "^8.4.18",
                "tailwindcss" => "^3.2.1",
                "typescript" => "^5.0.2",
                "vite" => "^4.0.0"
            ];
        } else {
            if (!isset($package["devDependencies"]["axios"])) {
                $package["devDependencies"]["axios"] = "^1.1.2";
            }

            $package["devDependencies"]["@headlessui/react"] = "^1.7.14";
            $package["devDependencies"]["@tailwindcss/forms"] = "^0.5.3";
            $package["devDependencies"]["@types/react"] = "^18.2.6";
            $package["devDependencies"]["@types/react-dom"] = "^18.2.4";
            $package["devDependencies"]["@vitejs/plugin-react"] = "^4.0.0";
            $package["devDependencies"]["autoprefixer"] = "^10.4.12";
            $package["devDependencies"]["laravel-vite-plugin"] = "^0.7.5";
            $package["devDependencies"]["postcss"] = "^8.4.18";
            $package["devDependencies"]["tailwindcss"] = "^3.2.1";
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
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/react-tw/resources', resource_path());
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
