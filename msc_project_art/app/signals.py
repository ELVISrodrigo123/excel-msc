from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from .models import Employee, EmployeeHistory, ShiftManager, ShiftManagerHistory, AreaForeman, AreaForemanHistory
from .models import ExcelFile
from .management.commands.import_info import Command

@receiver(pre_save, sender=Employee)
def track_employee_changes(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_employee = Employee.objects.get(pk=instance.pk)
            
            if old_employee.shift_group != instance.shift_group:
                EmployeeHistory.objects.create(
                    employee=instance,
                    old_shift_group=old_employee.shift_group,
                    new_shift_group=instance.shift_group,
                    action='Cambio de Turno',
                    comments=(f"El empleado cambió del turno 'Grupo {old_employee.shift_group}' "
                            f"al turno 'Grupo {instance.shift_group}'.")
                )
        except Employee.DoesNotExist:
            pass


@receiver(pre_save, sender=ShiftManager)
def track_shift_manager_changes(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_manager = ShiftManager.objects.get(pk=instance.pk)
            
            if old_manager.shift_group != instance.shift_group or old_manager.shift_type != instance.shift_type:
                ShiftManagerHistory.objects.create(
                    manager=instance,
                    old_shift_group=old_manager.shift_group,
                    new_shift_group=instance.shift_group,
                    old_shift_type=old_manager.shift_type,
                    new_shift_type=instance.shift_type,
                    action='Cambio de Grupo/Turno',
                    comments=(f"El jefe de turno cambió del turno 'Grupo {old_manager.shift_group}' "
                            f"({old_manager.get_shift_type_display()}) al turno 'Grupo {instance.shift_group}' "
                            f"({instance.get_shift_type_display()}).")
                )
        except ShiftManager.DoesNotExist:
            pass


@receiver(pre_save, sender=AreaForeman)
def track_area_foreman_changes(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_foreman = AreaForeman.objects.get(pk=instance.pk)
            
            if old_foreman.shift_group != instance.shift_group:
                AreaForemanHistory.objects.create(
                    area_foreman=instance,
                    old_shift_group=old_foreman.shift_group,
                    new_shift_group=instance.shift_group,
                    action='Cambio de Grupo',
                    comments=(f"El capataz de área cambió del turno 'Grupo {old_foreman.shift_group}' "
                            f"al turno 'Grupo {instance.shift_group}'.")
                )
        except AreaForeman.DoesNotExist:
            pass

@receiver(post_save, sender=ExcelFile)
def process_excel_file(sender, instance, created, **kwargs):
    if created and instance.is_active:
        # Llama al comando de importación de datos automáticamente
        command = Command()
        command.handle()