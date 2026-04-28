# form
Migraciones:
php artisan make:migration create_autores_table
php artisan migrate
php artisan migrate:rollback


git
Gestión de Cambios
git status: Muestra el estado actual (archivos modificados, nuevos o listos para guardar).
git add .: Prepara todos los archivos modificados para el siguiente commit.
git commit -m "mensaje": Guarda los cambios preparados en el historial local con una descripción.
git push origin [rama]: Sube tus commits locales al repositorio remoto en la nube.

Actualización y Sincronización
git fetch: Descarga la información del repositorio remoto sin modificar tus archivos locales.
git pull origin [rama]: Descarga y fusiona los cambios de la nube directamente en tu código local.
git log --oneline: Muestra el historial de commits de forma resumida.

Ramas (Branches)
git branch: Lista todas las ramas locales.
git checkout -b [nombre]: Crea una rama nueva y se cambia a ella inmediatamente.
git checkout [nombre]: Cambia de una rama a otra ya existente.
git branch -d [nombre]: Borra una rama local (solo si ya fusionaste sus cambios).

Fusión (Merge)
git merge [rama]: Une los cambios de la rama especificada dentro de la rama donde estás parado actualmente.

Corrección y Limpieza
git reset [archivo]: Quita un archivo del área de preparación (deshace el add).
git checkout -- [archivo]: Descarta los cambios realizados en un archivo y lo devuelve a su último estado guardado.