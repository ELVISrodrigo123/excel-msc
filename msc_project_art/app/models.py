from django.db import models
from django.utils import timezone

def upload_to(instance, filename):
    return f"excel_files/{filename}"

class ExcelFile(models.Model):
    description = models.CharField(max_length=255, blank=True, null=True)
    file = models.FileField(upload_to=upload_to, help_text='Sube el archivo Excel aquí.', verbose_name='Archivo Excel')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.description or "Archivo Excel"

class ShiftManager(models.Model):
    identity_card = models.CharField(
        verbose_name='Cédula de Identidad',
        max_length=20,
        unique=True,
        primary_key=True,  # Ahora es la clave primaria
        default=''
    )
    first_name = models.CharField(verbose_name='Nombre', max_length=100, default='')
    last_name = models.CharField(verbose_name='Apellidos', max_length=150, default='')
    phone_number = models.CharField(
        verbose_name='Número de Celular',
        max_length=15,
        default='',
        help_text='Incluye el código de área si es necesario. Ejemplo: +591 78965412'
    )
    shift_type = models.CharField(
        verbose_name='Turno',
        max_length=10,
        choices=[
            ('Día', 'Día'),
            ('Noche', 'Noche'),
        ],
        default='Día',
        help_text='Indica si el jefe está a cargo del turno de día o de noche.'
    )
    shift_group = models.PositiveSmallIntegerField(
        verbose_name='Grupo',
        choices=[
            (1, 'Grupo 1'),
            (2, 'Grupo 2'),
            (3, 'Grupo 3'),
            (4, 'Grupo 4'),
        ],
        default=1,
        help_text='Selecciona el grupo de turno del jefe (1 a 4).'
    )
    is_active = models.BooleanField(verbose_name='Jefe Activo', default=True)

    def __str__(self):
        return f'{self.identity_card} - {self.first_name} {self.last_name} (Turno: {self.shift_type}, Grupo: {self.shift_group})'


class AreaForeman(models.Model):
    identity_card = models.CharField(
        verbose_name='Cédula de Identidad',
        max_length=20,
        unique=True,
        primary_key=True,  # Ahora es la clave primaria
        default=''
    )
    first_name = models.CharField(verbose_name='Nombre', max_length=100, default='')
    last_name = models.CharField(verbose_name='Apellidos', max_length=150, default='')
    phone_number = models.CharField(
        verbose_name='Número de Celular',
        max_length=15,
        default='',
        help_text='Incluye el código de área si es necesario. Ejemplo: +591 78965412'
    )
    shift_group = models.PositiveSmallIntegerField(
        verbose_name='Grupo',
        choices=[
            (1, 'Grupo 1'),
            (2, 'Grupo 2'),
            (3, 'Grupo 3'),
            (4, 'Grupo 4'),
        ],
        default=1,
        help_text='Selecciona el grupo de turno del capataz de área (1 a 4).'
    )
    shift_manager = models.ForeignKey(
        'ShiftManager',
        on_delete=models.CASCADE,
        related_name='foremen',
        verbose_name='Jefe de Turno'
    )
    current_shift = models.CharField(
        verbose_name='Turno Actual',
        max_length=10,
        choices=[
            ('Día', 'Día'),
            ('Noche', 'Noche'),
        ],
        default='Día',
        help_text='Turno actual del capataz (Día o Noche).'
    )
    is_active = models.BooleanField(verbose_name='Capataz Activo', default=True)

    def __str__(self):
        return f'{self.identity_card} - {self.first_name} {self.last_name} (Grupo: {self.shift_group}, Turno: {self.current_shift})'
class Employee(models.Model):
    identity_card = models.CharField(
        verbose_name='Cédula de Identidad',
        max_length=20,
        unique=True,
        primary_key=True,
        default=''
    )
    first_name = models.CharField(verbose_name='Nombre', max_length=100, default='')
    last_name = models.CharField(verbose_name='Apellidos', max_length=150, default='')
    phone_number = models.CharField(
        verbose_name='Número de Celular',
        max_length=15,
        default='',
        help_text='Incluye el código de área si es necesario. Ejemplo: +591 78965412'
    )
    shift_group = models.PositiveSmallIntegerField(
        verbose_name='Grupo',
        choices=[
            (1, 'Grupo 1'),
            (2, 'Grupo 2'),
            (3, 'Grupo 3'),
            (4, 'Grupo 4'),
        ],
        default=1,
        help_text='Selecciona el grupo de turno del empleado (1 a 4).'
    )
    foreman = models.ForeignKey(
        'AreaForeman',
        on_delete=models.CASCADE,
        related_name='employees',
        verbose_name='Capataz de Área'
    )
    current_shift = models.CharField(
        verbose_name='Turno Actual',
        max_length=10,
        choices=[
            ('Día', 'Día'),
            ('Noche', 'Noche'),
        ],
        default='Día',
        help_text='Turno actual del empleado (Día o Noche).'
    )
    is_active = models.BooleanField(verbose_name='Empleado Activo', default=True)

    def __str__(self):
        return f'{self.identity_card} - {self.first_name} {self.last_name} (Grupo: {self.shift_group}, Turno: {self.current_shift}, Capataz: {self.foreman})'

# Historiales de los modelos

class ShiftManagerHistory(models.Model):
    manager = models.ForeignKey(
        ShiftManager,
        on_delete=models.CASCADE,
        related_name='history',
        verbose_name='Jefe de Turno'
    )
    change_date = models.DateTimeField(verbose_name='Fecha de Cambio', default=timezone.now)
    old_shift_type = models.CharField(verbose_name='Turno Anterior', max_length=10, blank=True, null=True)
    new_shift_type = models.CharField(verbose_name='Nuevo Turno', max_length=10, blank=True, null=True)
    old_shift_group = models.PositiveSmallIntegerField(verbose_name='Grupo Anterior', blank=True, null=True)
    new_shift_group = models.PositiveSmallIntegerField(verbose_name='Nuevo Grupo', blank=True, null=True)
    action = models.CharField(verbose_name='Acción', max_length=50)
    comments = models.TextField(verbose_name='Comentarios', blank=True, null=True)

    def __str__(self):
        return f'{self.manager} - {self.action} ({self.change_date})'


class AreaForemanHistory(models.Model):
    foreman = models.ForeignKey(AreaForeman,on_delete=models.CASCADE,related_name='history',verbose_name='Capataz de Area')
    change_date = models.DateTimeField(verbose_name='Fecha de Cambio', default=timezone.now )
    old_shift_group = models.PositiveSmallIntegerField( verbose_name='Grupo Anterior',blank=True,null=True)
    new_shift_group = models.PositiveSmallIntegerField( verbose_name='Nuevo Grupo', blank=True,null=True )
    old_shift = models.CharField(verbose_name='Turno Anterior',max_length=10,choices=[('Día', 'Día'),('Noche', 'Noche'),],blank=True,null=True)
    new_shift = models.CharField(verbose_name='Nuevo Turno', max_length=10, choices=[('Día', 'Día'), ('Noche', 'Noche'),],blank=True,null=True)
    action = models.CharField( verbose_name='Acción', max_length=50 )
    comments = models.TextField( verbose_name='Comentarios', blank=True,null=True)
    def __str__(self):
        return f'{self.foreman} - {self.action} ({self.change_date})'



class EmployeeHistory(models.Model):
    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name='history',
        verbose_name='Empleado'
    )
    change_date = models.DateTimeField(verbose_name='Fecha de Cambio', default=timezone.now)
    old_shift_group = models.PositiveSmallIntegerField(verbose_name='Grupo Anterior', blank=True, null=True)
    new_shift_group = models.PositiveSmallIntegerField(verbose_name='Nuevo Grupo', blank=True, null=True)
    old_shift = models.CharField(verbose_name='Turno Anterior', max_length=10,choices=[ ('Día', 'Día'),('Noche', 'Noche'), ], blank=True,null=True)
    new_shift = models.CharField( verbose_name='Nuevo Turno', max_length=10,choices=[('Día', 'Día'),('Noche', 'Noche'),], blank=True,null=True)
    action = models.CharField(verbose_name='Acción', max_length=50)
    comments = models.TextField(verbose_name='Comentarios', blank=True, null=True)

    def __str__(self):
        return f'{self.employee} - {self.action} ({self.change_date})'
        
class Artactividad(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre

# Modelo Actividad, dependiente de Artactividad
class Actividad(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    artactividad = models.ForeignKey(Artactividad, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

# Modelo Peligro, relacionado con Actividad
class Peligro(models.Model):
    descripcion = models.TextField()
    actividad = models.ForeignKey(Actividad, on_delete=models.CASCADE, related_name='peligros')

    def __str__(self):
        return self.descripcion

# Modelo Riesgo, relacionado con Actividad
class Riesgo(models.Model):
    descripcion = models.TextField()
    actividad = models.ForeignKey(Actividad, on_delete=models.CASCADE, related_name='riesgos')

    def __str__(self):
        return self.descripcion

# Modelo MedidaControl, relacionado con Actividad
class MedidaControl(models.Model):
    descripcion = models.TextField()
    actividad = models.ForeignKey(Actividad, on_delete=models.CASCADE, related_name='medidascontrol')

    def __str__(self):
        return self.descripcion
    
class Area(models.Model):
    OPCIONES_ACTIVIDAD = [
        ('210', '210-CHANCADO'),
        ('220', '220-DOMO'),
        ('230', '230-MOLIENDA'),
        ('240', '240-FLOTACION PLOMO'),
        ('250', '250-FLOTACION ZINC'),
        ('270', '270-REACTIVOS'),
        ('310', '310-ESPESADORES'),
        ('320', '320-FILTROS'),
        ('330', '330-CARGUIO'),
    ]
    
    # Relación con Artactividad
    artactividad = models.ForeignKey(
        Artactividad,
        on_delete=models.CASCADE,
        verbose_name='Area Principal',
        related_name='Area'
    )
    
    # Campo para seleccionar la opción
    opcion = models.CharField(
        max_length=3,  # Longitud de los códigos: '210', '220', etc.
        choices=OPCIONES_ACTIVIDAD,
        verbose_name='Opción de Area',
        help_text='Selecciona una opción de Area predefinida.'
    )

    def __str__(self):
        return f'{self.artactividad.nombre} - {self.get_opcion_display()}'

    class Meta:
        verbose_name = 'Area'
        verbose_name_plural = 'Areas'
        constraints = [
            models.UniqueConstraint(
                fields=['artactividad', 'opcion'],
                name='unique_artactividad_opcion'
            )
        ]

from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):

    pass