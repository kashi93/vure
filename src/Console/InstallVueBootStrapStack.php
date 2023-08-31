<?php

namespace Kashi93\Vure\Console;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Symfony\Component\Process\Process;
use RuntimeException;

class InstallVueBootStrapStack
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

        copy(__DIR__ . '/../../stubs/vue-bs/tsconfig.json', base_path('tsconfig.json'));
        copy(__DIR__ . '/../../stubs/vue-bs/vite.config.js', base_path('vite.config.js'));

        $command->info('Installing and building Node dependencies.');

        if (file_exists(base_path('pnpm-lock.yaml'))) {
            $this->runCommands($command, ['pnpm install', 'pnpm run build']);
        } elseif (file_exists(base_path('yarn.lock'))) {
            $this->runCommands($command, ['yarn install', 'yarn run build']);
        } else {
            $this->runCommands($command, ['npm install', 'npm run build']);
        }

        $command->info('Vure vue bootstrap scaffolding installed successfully.');
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
                "pinia" => "^2.0.32",
                "vue" => "^3.2.47",
                "vue-router" => "^4.1.6"
            ];
        } else {
            $package["dependencies"]["pinia"] = "^2.0.32";
            $package["dependencies"]["vue"] = "^3.2.47";
            $package["dependencies"]["vue-router"] = "^4.1.6";
        }

        if (!isset($package["devDependencies"])) {
            $package["devDependencies"] = [
                "axios" => "^1.1.2",
                "laravel-vite-plugin" => "^0.7.2",
                "@types/node" => "^18.14.2",
                "@vitejs/plugin-vue" => "^4.0.0",
                "@vue/tsconfig" => "^0.1.3",
                "npm-run-all" => "^4.1.5",
                "typescript" => "~4.8.4",
                "vite" => "^4.1.4",
                "vue-tsc" => "^1.2.0",
                "bootstrap" => "^5.2.3",
                "sass" => "1.32.13"
            ];
        } else {
            if (!isset($package["devDependencies"]["axios"])) {
                $package["devDependencies"]["axios"] = "^1.1.2";
            }

            $package["devDependencies"]["@types/node"] = "^18.14.2";
            $package["devDependencies"]["@vitejs/plugin-vue"] = "^4.0.0";
            $package["devDependencies"]["@vue/tsconfig"] = "^0.1.3";
            $package["devDependencies"]["npm-run-all"] = "^4.1.5";
            $package["devDependencies"]["typescript"] = "~4.8.4";
            $package["devDependencies"]["vue-tsc"] = "^1.2.0";
            $package["devDependencies"]["bootstrap"] = "^5.2.3";
            $package["devDependencies"]["sass"] = "1.32.13";
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
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/vue-bs/resources', resource_path());
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
